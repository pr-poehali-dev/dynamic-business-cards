import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=user1');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast({
          title: 'Аватар обновлен',
          description: 'Ваш аватар успешно загружен',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: 'Данные сохранены',
      description: 'Ваш профиль успешно обновлен',
    });
  };

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
          <Button variant="ghost" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
          <p className="text-muted-foreground">Управляйте своим профилем и настройками</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={18} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <Icon name="Wallet" size={18} />
              Платежи
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="text-2xl">ПВ</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                      <Icon name="Upload" size={18} className="mr-2" />
                      Загрузить фото
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Введите имя" defaultValue="Пользователь" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" defaultValue="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Ваш сайт</Label>
                    <Input id="website" placeholder="https://example.com" />
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Платежные данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    <h3 className="text-lg font-semibold">ЮMoney</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="yoomoney">Номер кошелька ЮMoney</Label>
                      <Input id="yoomoney" placeholder="41001234567890" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      На этот кошелек будут приходить ваши заработанные средства
                    </p>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold mb-1">Текущий баланс</h4>
                        <p className="text-3xl font-bold text-primary">₽32,000</p>
                      </div>
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="TrendingUp" className="text-white" size={32} />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                      <Icon name="ArrowDownToLine" size={18} className="mr-2" />
                      Вывести средства
                    </Button>
                  </CardContent>
                </Card>

                <Button onClick={handleSave} className="w-full" variant="outline">
                  Сохранить платежные данные
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name="Eye" size={32} className="text-primary" />
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      +12% за неделю
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">Всего просмотров</h3>
                  <p className="text-4xl font-bold mb-2">135,000</p>
                  <p className="text-sm text-muted-foreground">За все время</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name="MousePointer" size={32} className="text-secondary" />
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      +15% за неделю
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">Переходы</h3>
                  <p className="text-4xl font-bold mb-2">2,840</p>
                  <p className="text-sm text-muted-foreground">За последние 7 дней</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name="FileText" size={32} className="text-accent" />
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      13 активных
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">Рекламные объявления</h3>
                  <p className="text-4xl font-bold mb-2">25</p>
                  <p className="text-sm text-muted-foreground">Всего размещено</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name="Wallet" size={32} className="text-primary" />
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      +8% за месяц
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">Общий заработок</h3>
                  <p className="text-4xl font-bold mb-2">₽87,450</p>
                  <p className="text-sm text-muted-foreground">За все время</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>История операций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'income', desc: 'Просмотр рекламы "Акция"', amount: '+150', date: '15 окт' },
                    { type: 'withdraw', desc: 'Вывод на ЮMoney', amount: '-5000', date: '14 окт' },
                    { type: 'income', desc: 'Баннерная реклама', amount: '+320', date: '13 окт' },
                    { type: 'income', desc: 'Обмен визитами', amount: '+80', date: '12 окт' },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          <Icon name={transaction.type === 'income' ? 'ArrowUpRight' : 'ArrowDownLeft'} size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.desc}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {transaction.amount} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
