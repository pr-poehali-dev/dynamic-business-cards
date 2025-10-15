import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '2';
  const userName = localStorage.getItem('userName') || 'Пользователь';
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await api.getStats(userId);
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [userId]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }
  
  const viewsData = stats?.dailyStats?.slice(0, 7).reverse().map((d: any, i: number) => ({
    day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i] || d.date,
    views: d.views
  })) || [];
  
  const earningsData = stats?.dailyStats?.slice(0, 6).map((d: any) => ({
    month: d.date,
    amount: d.earnings
  })) || [];
  
  const dashboardStats = [
    { label: 'Просмотры', value: stats?.dailyStats?.reduce((acc: number, d: any) => acc + d.views, 0).toLocaleString() || '0', icon: 'Eye', trend: '+12%', color: 'text-primary' },
    { label: 'Заработано', value: `₽${Math.round(stats?.balance || 0).toLocaleString()}`, icon: 'Wallet', trend: '+8%', color: 'text-secondary' },
    { label: 'Рекламы', value: String(stats?.adsCount?.total || 0), icon: 'FileText', trend: `+${stats?.adsCount?.active || 0}`, color: 'text-accent' },
    { label: 'Переходы', value: stats?.dailyStats?.reduce((acc: number, d: any) => acc + d.clicks, 0).toLocaleString() || '0', icon: 'MousePointer', trend: '+15%', color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TrafficExchange
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
              <AvatarFallback>ПВ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Добро пожаловать, {userName}!</h2>
            <p className="text-muted-foreground">Статистика вашего аккаунта за последние 7 дней</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary text-white">
            <Icon name="Plus" size={20} className="mr-2" />
            Разместить рекламу
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${stat.color}`}>
                    <Icon name={stat.icon as any} size={24} />
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-none shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Просмотры за неделю</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Активные рекламы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(stats?.recentAds || []).map((ad: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name={ad.type === 'banner' ? 'Image' : 'FileText'} size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium">{ad.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {ad.views.toLocaleString()} / {ad.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(ad.views / ad.limit) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Доходы за 6 месяцев</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Target" className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Обмен визитами</h3>
                  <p className="text-sm text-muted-foreground">Начните получать трафик</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                Открыть сайты
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-secondary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Icon name="Megaphone" className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Реклама</h3>
                  <p className="text-sm text-muted-foreground">Размещайте и зарабатывайте</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Управление рекламой
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;