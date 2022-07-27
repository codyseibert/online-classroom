import { FC } from 'react';
import Button, { Variant } from '../Button';
import Header from '../Header';
import { HomeProps } from './homeController';

export const HomeView: FC<HomeProps> =
  ({ state, actions }) => {
    return (
      <>
        <Header />
        <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
          <div className="text-4xl">TODO: Make ME Landing Page</div>
          <Button
            variant={Variant.PRIMARY}
            onClick={actions.createBlankItem}
          >create item</Button>
          {state.items.map(item =>
            <div
              className="flex items-center space-x-4"
              key={item.id}
            >
              <div>{item.name}</div>
              <Button
                variant={Variant.DANGER}
                onClick={() => actions.deleteItemById(item.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </main>
      </>
    );
  };