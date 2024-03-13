import { Alert } from "antd";

export const TIIError = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  const formattedMessage = message.split("\n").map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  return (
    <Alert
      message={title}
      description={formattedMessage}
      type="error"
      closable={false}
    />
  );
};
