// Autobind Decorator
export function AutoBind(
  _target: any, // we are not using target and methodName, so the `_` makes TypeScript ignore that.
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return method.bind(this);
    },
  };
  return newDescriptor;
}
