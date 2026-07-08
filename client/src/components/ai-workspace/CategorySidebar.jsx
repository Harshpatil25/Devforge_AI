export function CategorySidebar({ categories, activeCategory, onSelect, selectedTool, onToolSelect }) {
  return (
    <aside className="w-full rounded-[24px] border border-white/10 bg-slate-900/70 p-4 lg:w-72">
      <div className="text-sm font-medium text-violet-300">Categories</div>
      <div className="mt-4 space-y-2">
        {categories.map((category) => (
          <button key={category.id} type="button" onClick={() => onSelect(category.id)} className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm ${activeCategory === category.id ? 'bg-violet-600/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <span>{category.label}</span>
            <span className="text-xs text-slate-500">{category.tools?.length || 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium text-violet-300">Tools</div>
        <div className="mt-3 space-y-2">
          {(categories.find((category) => category.id === activeCategory)?.tools || []).map((tool) => (
            <button key={tool.id} type="button" onClick={() => onToolSelect(tool)} className={`w-full rounded-2xl px-3 py-2 text-left text-sm ${selectedTool?.id === tool.id ? 'bg-violet-600/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              {tool.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
