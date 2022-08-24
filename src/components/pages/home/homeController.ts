type Item = {
  id: string;
  name: string;
  cost: number;
};

export const homeControllerModel = {
  items: [] as Item[],
  editing: new Map<string, boolean>(),
};

export type HomeControllerModel = typeof homeControllerModel;

export const homeController = (model: HomeControllerModel) => {
  const addItem = (item: Item) => {
    model.items.push(item);
  };

  const deleteItemById = (itemId: string) => {
    model.items.splice(
      model.items.findIndex(({ id }) => id !== itemId),
      1
    );
  };

  const createBlankItem = () => {
    model.items.push({
      id: Math.floor(Math.random() * 10000).toString(10),
      name: 'testing',
      cost: 100,
    });
  };

  const setEditing = (itemId: string) => {
    model.editing.set(itemId, true);
  };

  const saveItem = (itemId: string) => {
    model.editing.set(itemId, false);
  };

  const isEditMode = (itemId: string): boolean => !!model.editing.get(itemId);

  const updateItemName = (itemId: string, newName: string) => {
    const itemToUpdate = model.items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.name = newName;
    }
  };

  return {
    model,
    actions: {
      addItem,
      deleteItemById,
      createBlankItem,
      setEditing,
      saveItem,
      updateItemName,
    },
    computeds: {
      isEditMode,
    },
  };
};

export type HomeControllerProps = ReturnType<typeof homeController>;
