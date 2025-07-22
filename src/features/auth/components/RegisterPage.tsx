import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';

export default function RegisterPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await container.registerUseCase.execute({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <TypographyH2>{t('auth.registerTitle')}</TypographyH2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
              
              <div>
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder={t('auth.name')}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder={t('auth.email')}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder={t('auth.password')}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder={t('auth.confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? t('common.loading') : t('auth.register')}
                </Button>
              </div>

              <div className="text-center">
                <TypographyP>
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-500">
                    {t('auth.login')}
                  </Link>
                </TypographyP>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}