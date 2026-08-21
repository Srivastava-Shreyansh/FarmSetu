import re

with open('src/components/ui/index.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the broken input tag
pattern = r'<input[\s\S]*?\{\.\.\.props\}[\s\S]*?/>'
replacement = """<input
        ref={ref}
        className={`w-full rounded-xl border border-earth bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${className}`}
        {...props}
      />"""

content = re.sub(pattern, replacement, content)

with open('src/components/ui/index.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
