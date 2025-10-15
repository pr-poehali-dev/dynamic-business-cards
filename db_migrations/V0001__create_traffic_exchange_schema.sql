-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    phone VARCHAR(50),
    website_url TEXT,
    yoomoney_wallet VARCHAR(100),
    balance DECIMAL(10, 2) DEFAULT 0,
    total_earnings DECIMAL(10, 2) DEFAULT 0,
    role VARCHAR(20) DEFAULT 'user',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сайтов пользователей
CREATE TABLE IF NOT EXISTS user_sites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    site_url TEXT NOT NULL,
    site_title VARCHAR(255),
    site_description TEXT,
    views_received INTEGER DEFAULT 0,
    views_sent INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица рекламных объявлений
CREATE TABLE IF NOT EXISTS advertisements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    ad_type VARCHAR(20) NOT NULL,
    banner_url TEXT,
    target_url TEXT NOT NULL,
    views_limit INTEGER DEFAULT 10000,
    views_current INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    price DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    ended_at TIMESTAMP
);

-- Таблица просмотров
CREATE TABLE IF NOT EXISTS view_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    site_id INTEGER REFERENCES user_sites(id),
    ad_id INTEGER REFERENCES advertisements(id),
    view_type VARCHAR(20) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица транзакций
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    transaction_type VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица статистики по дням
CREATE TABLE IF NOT EXISTS daily_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    stat_date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    earnings DECIMAL(10, 2) DEFAULT 0,
    UNIQUE(user_id, stat_date)
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_user_sites_user_id ON user_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_advertisements_user_id ON advertisements(user_id);
CREATE INDEX IF NOT EXISTS idx_advertisements_status ON advertisements(status);
CREATE INDEX IF NOT EXISTS idx_view_logs_user_id ON view_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_view_logs_created_at ON view_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_stats_user_date ON daily_stats(user_id, stat_date);

-- Вставка тестовых данных
INSERT INTO users (email, name, password_hash, role, balance, total_earnings, status) VALUES
('admin@example.com', 'Администратор', '$2a$10$placeholder', 'admin', 0, 0, 'active'),
('ivan@example.com', 'Иван Петров', '$2a$10$placeholder', 'user', 3200, 12500, 'active'),
('maria@example.com', 'Мария Сидорова', '$2a$10$placeholder', 'user', 2100, 8900, 'active'),
('alex@example.com', 'Алексей Волков', '$2a$10$placeholder', 'user', 4500, 15200, 'blocked')
ON CONFLICT (email) DO NOTHING;

-- Вставка тестовых сайтов
INSERT INTO user_sites (user_id, site_url, site_title, views_received, views_sent) VALUES
(2, 'https://example1.com', 'Сайт Ивана', 12500, 10200),
(3, 'https://example2.com', 'Сайт Марии', 8900, 9100),
(4, 'https://example3.com', 'Сайт Алексея', 15200, 14800);

-- Вставка тестовых объявлений
INSERT INTO advertisements (user_id, title, ad_type, target_url, views_limit, views_current, clicks, status, price) VALUES
(2, 'Баннер 728×90 - Акция', 'banner', 'https://example1.com/promo', 50000, 45200, 2840, 'active', 5000),
(3, 'Текст "Скидки до 50%"', 'text', 'https://example2.com/sale', 15000, 12300, 890, 'pending', 1500),
(4, 'Баннер 300×250 - Новинки', 'banner', 'https://example3.com/new', 30000, 28900, 1920, 'active', 3500),
(2, 'Текст "Бесплатная доставка"', 'text', 'https://example1.com/delivery', 10000, 8100, 540, 'rejected', 1200);

-- Вставка тестовой статистики
INSERT INTO daily_stats (user_id, stat_date, views, clicks, earnings) VALUES
(2, CURRENT_DATE - INTERVAL '6 days', 145, 12, 450),
(2, CURRENT_DATE - INTERVAL '5 days', 200, 18, 620),
(2, CURRENT_DATE - INTERVAL '4 days', 180, 15, 550),
(2, CURRENT_DATE - INTERVAL '3 days', 260, 22, 810),
(2, CURRENT_DATE - INTERVAL '2 days', 310, 28, 980),
(2, CURRENT_DATE - INTERVAL '1 days', 220, 19, 690),
(2, CURRENT_DATE, 190, 16, 590);

-- Вставка тестовых транзакций
INSERT INTO transactions (user_id, transaction_type, amount, description, status) VALUES
(2, 'income', 150, 'Просмотр рекламы "Акция"', 'completed'),
(2, 'withdraw', -5000, 'Вывод на ЮMoney', 'completed'),
(3, 'income', 320, 'Баннерная реклама', 'completed'),
(2, 'income', 80, 'Обмен визитами', 'completed');