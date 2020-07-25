import { registerDecorator, ValidationOptions } from 'class-validator';

export function ProductMakeYearValidation(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: unknown, propertyName: string): void {
    registerDecorator({
      name: 'ProductMakeYearValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          value = Number(value);
          if (value <= new Date().getFullYear()) {
            return true;
          }
          return false;
          // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
