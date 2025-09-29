type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-400 font-semibold text-center p-8">{message}</p>;
}