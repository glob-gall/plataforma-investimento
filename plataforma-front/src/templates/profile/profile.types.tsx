// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileTemplateProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileContainerArgs{
  loading: boolean;
  emoji: string;
  actions: {
    onFormSubmit: (formData: EditUserFormData) => Promise<void>;
  }
}
export interface EditUserFormData {
  name?: string;
  birth?: string;
}