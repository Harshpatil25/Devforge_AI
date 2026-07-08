export function SubmitButton({ loading, children, disabled = false, onClick, type = 'submit' }) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
