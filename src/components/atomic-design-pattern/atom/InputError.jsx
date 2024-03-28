export default function InputError({ condition, children }) {
  return condition ? "" : <label className="input-error">{children}</label>;
}
