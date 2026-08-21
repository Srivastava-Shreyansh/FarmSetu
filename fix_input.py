import re

with open('src/components/ui/index.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("className={{w-full rounded-xl border border-earth bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${className}}}", "className={`w-full rounded-xl border border-earth bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${className}`}")

# The original fix_input.py replaced it with {{w-full... ${className}}}. Wait, no, in fix_input.py I wrote:
# className={`w-full... ${className}`}
# But when Python parses `...` in a normal string without raw, the backticks are preserved.
# Why did it end up with {{ ? Because in Python f-string or string literal maybe? 
# Wait, in fix_input.py I did NOT use f-string. I used `...`
# Ah! In my `Out-File` command in PowerShell from earlier (task-244), maybe that didn't run? 
# No, wait, in fix_input.py:
# new_input = """export const Input = React.forwardRef(({ label, error, className = "", ...props }, ref) => {
# ...
#         className={`w-full ... ${className}`}
# ...
# """
# This is a normal string, so it should be backticks.
# Let's see what is ACTUALLY in the file.
