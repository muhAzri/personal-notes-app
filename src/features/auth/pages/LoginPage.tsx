import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { TypographyH2, TypographyP } from '@core/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@core/components/ui/card';
import { useTranslation } from '@core/application/hooks/useTranslation';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setAuthenticated, setUser, setLoading } from '@infrastructure/store/authSlice';
import { container } from '@infrastructure/di/container';

export default function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    dispatch(setLoading(true));

    try {
      await container.loginUseCase.execute({
        email: formData.email,
        password: formData.password,
      });
      
      const user = await container.getCurrentUserUseCase.execute();
      dispatch(setUser(user));
      void navigate('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('auth.loginFailed');
      setError(errorMessage);
      dispatch(setAuthenticated(false));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <TypographyH2>{t('auth.loginTitle')}</TypographyH2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => void handleSubmit(e)}>
              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
              
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? t('common.loading') : t('auth.login')}
                </Button>
              </div>

              <div className="text-center">
                <TypographyP>
                  {t('auth.noAccount')}{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-500">
                    {t('auth.register')}
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