export interface Algorithm {
  label: string;
  transform: (text: string) => string;
}