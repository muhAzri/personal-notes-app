import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@infrastructure/store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;