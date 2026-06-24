export const UI_PACKAGE_STATUS = "placeholder" as const;

export interface SharedUiComponentContract {
  readonly name: string;
  readonly accessibilityReviewed: boolean;
}
