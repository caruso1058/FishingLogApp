import React from "react";

export function Table({ children }) {
  return <table className="min-w-full border">{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-gray-200 border-b">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 border-r">{children}</td>;
}
