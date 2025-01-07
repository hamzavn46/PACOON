export function Button({ children, className, variant, ...props }) {
    const baseClass = "px-4 py-2 rounded-lg transition-colors"
    const variantClass = variant === "ghost" ? "hover:bg-opacity-10" : ""
    
    return (
      <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
        {children}
      </button>
    )
  }