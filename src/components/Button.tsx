/**
 * Example Component
 *
 * Place your React components in this directory
 */

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: "10px 20px", cursor: "pointer" }}
    >
      {label}
    </button>
  );
};
