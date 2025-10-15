"""
Business: Управление профилем пользователя - получение и обновление данных
Args: event с httpMethod (GET/PUT), queryParameters или body
Returns: HTTP response с данными пользователя
"""
import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        user_id = params.get('user_id', '2')
        
        cur.execute(f"""
            SELECT id, email, name, avatar_url, phone, website_url, 
                   yoomoney_wallet, balance, total_earnings, role, status
            FROM users 
            WHERE id = {user_id}
        """)
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': user[0],
            'email': user[1],
            'name': user[2],
            'avatarUrl': user[3],
            'phone': user[4],
            'websiteUrl': user[5],
            'yoomoneyWallet': user[6],
            'balance': float(user[7]),
            'totalEarnings': float(user[8]),
            'role': user[9],
            'status': user[10]
        }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id', '2')
        name = body_data.get('name', '').replace("'", "''")
        phone = body_data.get('phone', '').replace("'", "''")
        website_url = body_data.get('websiteUrl', '').replace("'", "''")
        yoomoney_wallet = body_data.get('yoomoneyWallet', '').replace("'", "''")
        avatar_url = body_data.get('avatarUrl', '').replace("'", "''")
        
        update_fields = []
        if name:
            update_fields.append(f"name = '{name}'")
        if phone:
            update_fields.append(f"phone = '{phone}'")
        if website_url:
            update_fields.append(f"website_url = '{website_url}'")
        if yoomoney_wallet:
            update_fields.append(f"yoomoney_wallet = '{yoomoney_wallet}'")
        if avatar_url:
            update_fields.append(f"avatar_url = '{avatar_url}'")
        
        update_fields.append("updated_at = CURRENT_TIMESTAMP")
        
        if update_fields:
            cur.execute(f"""
                UPDATE users 
                SET {', '.join(update_fields)}
                WHERE id = {user_id}
                RETURNING id, email, name, avatar_url, phone, website_url, yoomoney_wallet
            """)
            user = cur.fetchone()
            conn.commit()
            
            result = {
                'success': True,
                'user': {
                    'id': user[0],
                    'email': user[1],
                    'name': user[2],
                    'avatarUrl': user[3],
                    'phone': user[4],
                    'websiteUrl': user[5],
                    'yoomoneyWallet': user[6]
                }
            }
        else:
            result = {'success': False, 'error': 'No fields to update'}
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
