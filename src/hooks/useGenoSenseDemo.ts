import { useContext } from 'react';
import {
  GenoSenseContext,
  GenoSenseContextValue,
} from '../context/GenoSenseContext';

export function useGenoSenseDemo(): GenoSenseContextValue {
  const ctx = useContext(GenoSenseContext);
  if (!ctx) {
    throw new Error(
      'useGenoSenseDemo must be used within a GenoSenseProvider'
    );
  }
  return ctx;
}
