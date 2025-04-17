// components/Sparkline.jsx
"use client";

export const Sparkline = ({ data = [], color = "bg-blue-500" }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="flex items-end h-full gap-px">
      {data.map((value, index) => (
        <div
          key={index}
          className={`${color} flex-1 rounded-t-sm`}
          style={{
            height: `${(value / maxValue) * 100}%`,
            opacity: 0.3 + (index / data.length) * 0.7,
          }}
        />
      ))}
    </div>
  );
};
