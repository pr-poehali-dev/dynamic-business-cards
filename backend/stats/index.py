"""
Business: Получение статистики пользователя - просмотры, доходы, рекламы
Args: event с queryStringParameters (user_id)
Returns: HTTP response с данными статистики
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
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    user_id = params.get('user_id', '2')
    
    database_url = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute(f"SELECT balance, total_earnings FROM users WHERE id = {user_id}")
    user_data = cur.fetchone()
    
    cur.execute(f"""
        SELECT stat_date, views, clicks, earnings 
        FROM daily_stats 
        WHERE user_id = {user_id} 
        ORDER BY stat_date DESC 
        LIMIT 7
    """)
    daily_rows = cur.fetchall()
    
    cur.execute(f"""
        SELECT COUNT(*), status 
        FROM advertisements 
        WHERE user_id = {user_id} 
        GROUP BY status
    """)
    ads_rows = cur.fetchall()
    
    cur.execute(f"""
        SELECT id, title, ad_type, views_current, views_limit, status
        FROM advertisements 
        WHERE user_id = {user_id}
        ORDER BY created_at DESC
        LIMIT 5
    """)
    recent_ads = cur.fetchall()
    
    cur.close()
    conn.close()
    
    daily_stats = [
        {
            'date': str(row[0]),
            'views': row[1],
            'clicks': row[2],
            'earnings': float(row[3])
        }
        for row in daily_rows
    ]
    
    ads_by_status = {row[1]: row[0] for row in ads_rows}
    
    recent_ads_list = [
        {
            'id': row[0],
            'title': row[1],
            'type': row[2],
            'views': row[3],
            'limit': row[4],
            'status': row[5]
        }
        for row in recent_ads
    ]
    
    result = {
        'balance': float(user_data[0]) if user_data else 0,
        'totalEarnings': float(user_data[1]) if user_data else 0,
        'dailyStats': daily_stats,
        'adsCount': {
            'active': ads_by_status.get('active', 0),
            'pending': ads_by_status.get('pending', 0),
            'total': sum(ads_by_status.values())
        },
        'recentAds': recent_ads_list
    }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    }
