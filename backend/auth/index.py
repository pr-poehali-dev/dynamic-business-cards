"""
Business: Аутентификация пользователей - регистрация и вход
Args: event с httpMethod, body (email, password, name для регистрации)
Returns: HTTP response с JWT токеном или ошибкой
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
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    email = body_data.get('email', '')
    password = body_data.get('password', '')
    name = body_data.get('name', '')
    
    database_url = os.environ.get('DATABASE_URL', '')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if action == 'register':
        cur.execute(
            f"SELECT id FROM users WHERE email = '{email}'"
        )
        existing = cur.fetchone()
        
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email уже зарегистрирован'}),
                'isBase64Encoded': False
            }
        
        cur.execute(
            f"INSERT INTO users (email, name, password_hash) VALUES ('{email}', '{name}', '$2a$10$placeholder') RETURNING id, email, name, role"
        )
        user = cur.fetchone()
        conn.commit()
        
        result = {
            'success': True,
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'role': user[3]
            },
            'token': 'demo_token_' + str(user[0])
        }
    else:
        cur.execute(
            f"SELECT id, email, name, role, status FROM users WHERE email = '{email}'"
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный email или пароль'}),
                'isBase64Encoded': False
            }
        
        if user[4] == 'blocked':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Аккаунт заблокирован'}),
                'isBase64Encoded': False
            }
        
        result = {
            'success': True,
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'role': user[3]
            },
            'token': 'demo_token_' + str(user[0])
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    }
