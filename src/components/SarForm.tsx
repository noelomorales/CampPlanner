import { useState } from 'react';

export interface SarData {
  contactName: string;
  phone: string;
  permit: string;
  vehicle: string;
  gearNotes: string;
  medicalNotes: string;
}

interface Props {
  data: SarData;
  onSave(data: SarData): void;
}

export default function SarForm({ data, onSave }: Props) {
  const [form, setForm] = useState(data);
  return (
    <div>
      {Object.entries(form).map(([k, v]) => (
        <div key={k}>
          <label>{k}</label>
          <input
            value={v}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        </div>
      ))}
      <button onClick={() => onSave(form)}>Save SAR</button>
    </div>
  );
}
