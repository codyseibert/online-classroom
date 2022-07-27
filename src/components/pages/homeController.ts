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
  }
}

export const homeController = (render: () => void): HomeProps => {
  const items: Item[] = [];

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

  return {
    state: {
      items,
    },
    actions: {
      addItem,
      deleteItemById,
      createBlankItem,
    }
  };
};