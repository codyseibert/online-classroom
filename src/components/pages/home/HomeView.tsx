import React, { FC } from 'react';
import Button, { Variant } from '../../Button';

import { HomeControllerProps } from './homeController';

export const HomeView: FC<HomeControllerProps> = ({
  model,
  actions,
  computeds,
}) => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <div className="text-4xl">TODO LIST MVC</div>
        <Button
          variant={Variant.PRIMARY}
          onClick={actions.createBlankItem}
        >
          Create Item
        </Button>
        {model.items.map((item) => (
          <div
            className="flex items-center space-x-4"
            key={item.id}
          >
            {computeds.isEditMode(item.id) ? (
              <input
                onChange={(e) =>
                  actions.updateItemName(item.id, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    actions.saveItem(item.id);
                  }
                }}
                value={item.name}
              ></input>
            ) : (
              <div onClick={() => actions.setEditing(item.id)}>{item.name}</div>
            )}

            <Button
              variant={Variant.DANGER}
              onClick={() => actions.deleteItemById(item.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </main>
    </>
  );
};
