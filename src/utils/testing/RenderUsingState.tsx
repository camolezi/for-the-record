import { render } from '@testing-library/react';
import { AppState, CreateStore } from '../../app/Store';
import WrapWithProviders from '../../app/Providers';

export function RenderUsingState(
  element: JSX.Element,
  state: Partial<AppState>
): void {
  render(
    WrapWithProviders(
      element,
      CreateStore({
        ...state,
      })
    )
  );
}

export function RenderDefaultState(element: JSX.Element): void {
  render(WrapWithProviders(element, CreateStore()));
}
