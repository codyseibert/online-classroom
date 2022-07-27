import { homeController } from './homeController';


describe('homeController', () => {
  const renderSpy = jest.fn();

  it('should initialize with zero items', () => {
    const controller = homeController(renderSpy);
    expect(controller.state.items.length).toBe(0);
  });

  describe('addItem', () => {
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