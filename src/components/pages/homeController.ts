type Item = {
  id: string
  name: string
  cost: number
}

export type HomeProps = {
  state: {
    items: Item[]
  },
  actions: {
    createBlankItem: () => void
    addItem: (item: Item) => void
    deleteItemById: (itemId: string) => void
    setEditing: (itemId: string) => void
    saveItem: (itemId: string) => void
    updateItemName: (itemId: string, newName: string) => void
  },
  computeds: {
    isEditMode: (itemId: string) => boolean
  }
}

export const homeController = (render: () => void): HomeProps => {
  const items: Item[] = [];
  const editing = new Map<string, boolean>();

  const addItem = (item: Item) => {
    items.push(item);
    render();
  };

  const deleteItemById = (itemId: string) => {
    items.splice(
      items.findIndex(({ id }) => id !== itemId),
      1
    );
    render();
  };

  const createBlankItem = () => {
    items.push({
      id: Math.floor(Math.random() * 10000).toString(10),
      name: 'testing',
      cost: 100
    });
    render();
  };

  const setEditing = (itemId: string) => {
    editing.set(itemId, true);
    render();
  };

  const saveItem = (itemId: string) => {
    editing.set(itemId, false);
    render();
  };

  const isEditMode = (itemId: string): boolean =>
    !!editing.get(itemId);

  const updateItemName = (itemId: string, newName: string) => {
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.name = newName;
    }
    render();
  };

  return {
    state: {
      items,
    },
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
    }
  };
};