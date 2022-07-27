import { homeController } from './homeController';

describe('homeController', () => {
  let renderSpy: any;

  beforeEach(() => {
    renderSpy = jest.fn();
  });

  it('should initialize with zero items', () => {
    const controller = homeController(renderSpy);
    expect(controller.state.items.length).toBe(0);
  });

  describe('addItem', () => {
    it('should allow a user to add an item', () => {
      const controller = homeController(renderSpy);
      const expectedItem = {
        id: '1',
        name: 'hello',
        cost: 100,
      };
      expect(controller.actions.addItem(expectedItem));
      expect(controller.state.items.length).toBe(1);
      expect(controller.state.items[0]).toEqual(expectedItem);
    });
  });

  describe('createBlankItem', () => {
    it('should create a generic item', () => {
      const controller = homeController(renderSpy);
      expect(controller.actions.createBlankItem());
      expect(controller.state.items.length).toBe(1);
      expect(controller.state.items[0]).toBeDefined();
    });
  });

  describe('deleteItemById', () => {
    it('should allow a user to delete an item using the id of that item', () => {
      const controller = homeController(renderSpy);
      expect(controller.actions.createBlankItem());
      const { id } = controller.state.items[0]!;
      controller.actions.deleteItemById(id);
      expect(controller.state.items.length).toBe(0);
    });
  });

  describe('updateItemName', () => {
    it('should allow a user to update an item name', () => {
      const controller = homeController(renderSpy);
      expect(controller.actions.createBlankItem());
      const { id } = controller.state.items[0]!;
      renderSpy.mockClear();
      controller.actions.updateItemName(id, 'whatisup');
      expect(controller.state.items[0]?.name).toEqual('whatisup');
      expect(renderSpy).toHaveBeenCalled();
    });
  });

});