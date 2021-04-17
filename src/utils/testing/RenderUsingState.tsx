import { render } from '@testing-library/react';
import { AppState, CreateStore } from '../../app/Store';
import WrapWithProviders from '../../app/Providers';

export default function RenderUsingState(
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
