export function ShouldIncludeObjWithProps<
  T extends Record<string, unknown>,
  O extends Record<string, unknown>
>(objArray: T[], shouldInclude: O, ...props: string[]): void {
  props.forEach((property) => {
    const arrayOfPropery = objArray.map((obj) => obj[property]);
    expect(arrayOfPropery).to.deep.include(shouldInclude[property]);
  });
}

export function ShouldNotIncludeObjWithProps<
  T extends Record<string, unknown>,
  O extends Record<string, unknown>
>(objArray: T[], shouldInclude: O, ...props: string[]): void {
  props.forEach((property) => {
    const arrayOfPropery = objArray.map((obj) => obj[property]);
    expect(arrayOfPropery).to.not.deep.include(shouldInclude[property]);
  });
}
