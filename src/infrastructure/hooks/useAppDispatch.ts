import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@infrastructure/store/store';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();