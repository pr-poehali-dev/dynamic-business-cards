import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const Admin = () => {
  const [users] = useState([
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', views: 12500, earnings: 3200, status: 'active' },
    { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', views: 8900, earnings: 2100, status: 'active' },
    { id: 3, name: 'Алексей Волков', email: 'alex@example.com', views: 15200, earnings: 4500, status: 'blocked' },
    { id: 4, name: 'Ольга Новикова', email: 'olga@example.com', views: 6700, earnings: 1800, status: 'active' },
  ]);

  const [ads] = useState([
    { id: 1, title: 'Баннер 728×90 - Акция', user: 'Иван Петров', views: 45200, status: 'active', type: 'banner' },
    { id: 2, title: 'Текст "Скидки до 50%"', user: 'Мария Сидорова', views: 12300, status: 'pending', type: 'text' },
    { id: 3, title: 'Баннер 300×250 - Новинки', user: 'Алексей Волков', views: 28900, status: 'active', type: 'banner' },
    { id: 4, title: 'Текст "Бесплатная доставка"', user: 'Ольга Новикова', views: 8100, status: 'rejected', type: 'text' },
  ]);

  const stats = [
    { label: 'Всего пользователей', value: '1,247', icon: 'Users', color: 'from-primary to-secondary' },
    { label: 'Активных реклам', value: '89', icon: 'FileText', color: 'from-secondary to-accent' },
    { label: 'Общий доход', value: '₽485K', icon: 'Wallet', color: 'from-accent to-primary' },
    { label: 'Просмотры сегодня', value: '45.2K', icon: 'Eye', color: 'from-primary to-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Shield" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Админ-панель
            </h1>
          </div>
          <Button variant="ghost" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            К дашборду
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Управление платформой</h2>
          <p className="text-muted-foreground">Контроль пользователей, рекламы и статистики</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className="text-white" size={24} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Пользователи</CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-white">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm font-medium">{user.views.toLocaleString()} просм.</p>
                        <p className="text-xs text-muted-foreground">₽{user.earnings.toLocaleString()}</p>
                      </div>
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </Badge>
                      <Button size="icon" variant="ghost">
                        <Icon name="MoreVertical" size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Модерация рекламы</CardTitle>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                2 на проверке
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ads.map((ad) => (
                  <div key={ad.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          ad.type === 'banner' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-secondary/20 text-secondary'
                        }`}>
                          <Icon name={ad.type === 'banner' ? 'Image' : 'FileText'} size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{ad.title}</p>
                          <p className="text-xs text-muted-foreground">от {ad.user}</p>
                        </div>
                      </div>
                      <Badge variant={
                        ad.status === 'active' ? 'default' : 
                        ad.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }>
                        {ad.status === 'active' ? 'Активна' : 
                         ad.status === 'pending' ? 'На проверке' : 
                         'Отклонена'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {ad.views.toLocaleString()} просмотров
                      </p>
                      {ad.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <Icon name="Check" size={14} className="mr-1" />
                            Одобрить
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-destructive">
                            <Icon name="X" size={14} className="mr-1" />
                            Отклонить
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Настройки платформы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <Icon name="ShieldCheck" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Автомодерация рекламы</p>
                    <p className="text-sm text-muted-foreground">Автоматическая проверка объявлений</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <Icon name="UserCheck" size={24} className="text-secondary" />
                  <div>
                    <p className="font-medium">Регистрация новых пользователей</p>
                    <p className="text-sm text-muted-foreground">Разрешить создание новых аккаунтов</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={24} className="text-accent" />
                  <div>
                    <p className="font-medium">Email уведомления</p>
                    <p className="text-sm text-muted-foreground">Отправлять письма о важных событиях</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <Icon name="DollarSign" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Минимальная сумма вывода</p>
                    <p className="text-sm text-muted-foreground">Текущий лимит: ₽1000</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Изменить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
