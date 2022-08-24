import { homeController, HomeControllerModel } from './homeController';

describe('homeController', () => {
  let mockModel: HomeControllerModel;

  beforeEach(() => {
    mockModel = {
      items: [],
      editing: new Map(),
    };
  });

  it('should initialize with zero items', () => {
    const { model } = homeController(mockModel);
    expect(model.items.length).toBe(0);
  });

  describe('addItem', () => {
    it('should allow a user to add an item', () => {
      const { model, actions } = homeController(mockModel);
      const expectedItem = {
        id: '1',
        name: 'hello',
        cost: 100,
      };
      expect(actions.addItem(expectedItem));
      expect(model.items.length).toBe(1);
      expect(model.items[0]).toEqual(expectedItem);
    });
  });

  describe('createBlankItem', () => {
    it('should create a generic item', () => {
      const { model, actions } = homeController(mockModel);
      expect(actions.createBlankItem());
      expect(model.items.length).toBe(1);
      expect(model.items[0]).toBeDefined();
    });
  });

  describe('deleteItemById', () => {
    it('should allow a user to delete an item using the id of that item', () => {
      const { model, actions } = homeController(mockModel);
      expect(actions.createBlankItem());
      const { id } = model.items[0]!;
      actions.deleteItemById(id);
      expect(model.items.length).toBe(0);
    });
  });

  describe('updateItemName', () => {
    it('should allow a user to update an item name', () => {
      const { model, actions } = homeController(mockModel);
      expect(actions.createBlankItem());
      const { id } = model.items[0]!;
      actions.updateItemName(id, 'whatisup');
      expect(model.items[0]?.name).toEqual('whatisup');
    });
  });
});
