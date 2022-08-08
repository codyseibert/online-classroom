import { homeController } from './HomeController';

describe('homeController', () => {
  let renderSpy: any;

  beforeEach(() => {
    renderSpy = jest.fn();
  });

  it('should initialize with zero items', () => {
    const { state } = homeController(renderSpy);
    expect(state.items.length).toBe(0);
  });

  describe('addItem', () => {
    it('should allow a user to add an item', () => {
      const { state, actions } = homeController(renderSpy);
      const expectedItem = {
        id: '1',
        name: 'hello',
        cost: 100,
      };
      expect(actions.addItem(expectedItem));
      expect(state.items.length).toBe(1);
      expect(state.items[0]).toEqual(expectedItem);
    });
  });

  describe('createBlankItem', () => {
    it('should create a generic item', () => {
      const { state, actions } = homeController(renderSpy);
      expect(actions.createBlankItem());
      expect(state.items.length).toBe(1);
      expect(state.items[0]).toBeDefined();
    });
  });

  describe('deleteItemById', () => {
    it('should allow a user to delete an item using the id of that item', () => {
      const { state, actions } = homeController(renderSpy);
      expect(actions.createBlankItem());
      const { id } = state.items[0]!;
      actions.deleteItemById(id);
      expect(state.items.length).toBe(0);
    });
  });

  describe('updateItemName', () => {
    it('should allow a user to update an item name', () => {
      const { state, actions } = homeController(renderSpy);
      expect(actions.createBlankItem());
      const { id } = state.items[0]!;
      renderSpy.mockClear();
      actions.updateItemName(id, 'whatisup');
      expect(state.items[0]?.name).toEqual('whatisup');
      expect(renderSpy).toHaveBeenCalled();
    });
  });

});