import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? 'Добро пожаловать!' : 'Регистрация успешна!',
      description: isLogin ? 'Вы успешно вошли в систему' : 'Аккаунт создан, добро пожаловать!',
    });
    navigate('/dashboard');
  };

  const features = [
    {
      icon: 'Eye',
      title: 'Обмен визитами',
      description: 'Получайте реальных посетителей на ваш сайт через систему взаимных просмотров',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: 'Megaphone',
      title: 'Размещение рекламы',
      description: 'Баннерная и текстовая реклама с детальной статистикой показов',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: 'BarChart3',
      title: 'Подробная аналитика',
      description: 'Отслеживайте просмотры, клики и конверсии в реальном времени',
      gradient: 'from-accent to-primary',
    },
    {
      icon: 'Wallet',
      title: 'Монетизация трафика',
      description: 'Зарабатывайте на просмотре рекламы и размещении объявлений',
      gradient: 'from-primary to-accent',
    },
  ];

  const stats = [
    { value: '500K+', label: 'Просмотров в день' },
    { value: '12K+', label: 'Активных пользователей' },
    { value: '₽2.5M', label: 'Выплачено партнерам' },
    { value: '99.8%', label: 'Время работы' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TrafficExchange
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground transition-colors">
              Статистика
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </a>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="TrendingUp" size={16} />
              Монетизируйте ваш трафик
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Обмен визитами
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                нового поколения
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Привлекайте реальных посетителей, размещайте рекламу и зарабатывайте на своем трафике с детальной аналитикой
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity"
                onClick={() => document.getElementById('auth-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать бесплатно
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
          </div>

          <Card id="auth-form" className="border-none shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin ? 'Войдите, чтобы продолжить' : 'Начните зарабатывать уже сегодня'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Введите ваше имя" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline"
                  >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Или войти через</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="w-full">
                    <Icon name="Mail" size={18} className="mr-2" />
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <Icon name="Facebook" size={18} className="mr-2" />
                    VK
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="stats" className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Все для успешной монетизации</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Комплексная платформа для обмена трафиком и размещения рекламы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon name={feature.icon as any} className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Простые и честные тарифы</h2>
          <p className="text-xl text-muted-foreground">Выберите план, который подходит вам</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Старт',
              price: 'Бесплатно',
              features: ['1,000 просмотров/мес', 'Базовая аналитика', 'Email поддержка'],
              gradient: 'from-primary/20 to-secondary/20',
            },
            {
              name: 'Про',
              price: '₽990/мес',
              features: ['10,000 просмотров/мес', 'Полная аналитика', 'Приоритетная поддержка', 'API доступ'],
              gradient: 'from-primary to-secondary',
              popular: true,
            },
            {
              name: 'Бизнес',
              price: '₽2990/мес',
              features: ['Безлимит просмотров', 'Белый лейбл', 'Персональный менеджер', 'Индивидуальные настройки'],
              gradient: 'from-secondary/20 to-accent/20',
            },
          ].map((plan, index) => (
            <Card
              key={index}
              className={`border-none shadow-lg transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-card/80 backdrop-blur-sm'
              }`}
            >
              {plan.popular && (
                <div className="text-center py-2 bg-white/20 font-semibold text-sm">
                  Популярный выбор
                </div>
              )}
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold">{plan.price}</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Icon name="Check" size={18} className={plan.popular ? 'text-white' : 'text-primary'} />
                      <span className={plan.popular ? 'text-white/90' : 'text-muted-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-gradient-to-r from-primary to-secondary text-white'
                  }`}
                >
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={18} />
                </div>
                <span className="font-bold text-lg">TrafficExchange</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа обмена визитами и монетизации трафика
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 TrafficExchange. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
