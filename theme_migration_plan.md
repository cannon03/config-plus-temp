# Theme Porting Plan: Toyama to Config-Plus

## 1. Theme Analysis (Toyama Config Plus)

### Colors
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| Navy | `#10223A` | `--color-navy` | Primary Brand Color? Background? |
| Navy Dark | `#0f1b2e` | `--color-navy-dark` | Darker backgrounds |
| Teal | `#226A73` | `--color-teal` | Accents, Buttons? |
| Lime | `#97D700` | `--color-lime` | Highlights, Success? |
| Light Carbon | `#F8F7F7` | `--color-light-carbon` | Backgrounds (Light mode) |
| Cloudy Gray | `#DBDBDB` | `--color-cloudy-gray` | Borders? |
| Dark Gray | `#999D9E` | `--color-dark-gray` | Text? |
| Heavy Carbon | `#323233` | `--color-heavy-carbon` | Main Text |
| White | `#FFFFFF` | `--color-white` | Card backgrounds |

### Typography
- **Display**: 'DM Sans'
- **Body**: 'Poppins'

### Shapes
- **Border Radius**: 12px (`--radius-lg`)

## 2. Mapping to Config-Plus (Shadcn UI / Tailwind)

Config-Plus uses `oklch` colors. I will convert the Toyama Hex colors to `oklch` or just use Hex if necessary (though `oklch` is preferred for consistency in the new project, replacing the variables works best).
Actually, since I'm just replacing the values in `app.css`, I can use Hex values directly in the CSS variables for simplicity and exact matching, unless the project strictly enforces `oklch`. The `@theme` block or `tailwind.config.ts` might need updates too.

**Proposed Mapping:**
- `--background`: White `#FFFFFF` or Light Carbon `#F8F7F7`? (Need to check `toyama` layout).
- `--foreground`: Heavy Carbon `#323233`
- `--primary`: Navy `#10223A`
- `--primary-foreground`: White `#FFFFFF`
- `--secondary`: Teal `#226A73` ? or maybe Lime?
- `--secondary-foreground`: White `#FFFFFF`
- `--muted`: Cloudy Gray `#DBDBDB`
- `--muted-foreground`: Dark Gray `#999D9E`
- `--accent`: Lime `#97D700`
- `--card`: White `#FFFFFF`
- `--card-foreground`: Heavy Carbon `#323233`
- `--border`: Cloudy Gray `#DBDBDB`

**Typography Update:**
- Update font imports in `app.css`.
- Update `font-family` in `app.css` or `tailwind.config.ts`.

## 3. Implementation Steps
1.  [ ] **Update `app.css`**: Replace the CSS variables with the mapped Toyama colors (converted to fit the `oklch` or just hex if compatible).
    *   *Self-Correction*: The existing `app.css` uses `oklch`. I should try to use hex and see if it breaks, or convert. Tailwind v4 (which seems to be used given `@import "tailwindcss";`) handles colors well. I'll stick to Hex for exactness of the "Discarded Project".
2.  [ ] **Update Fonts**: Add the Google Fonts import for DM Sans and Poppins to `app.css`. Update the font family definitions.
3.  [ ] **Update Tailwind Config**: Check `tailwind.config.ts` or the CSS `@theme` vars to ensure fonts are hooked up correctly.
4.  [ ] **Scan Svelte Files**: The user said "Make sure you don't skip a single svelte file." & "Make sure you only touch the thematics / ui".
    *   This implies there might be hardcoded colors or classes in the Svelte files that need changing to use the new variables or specific mapped classes.
    *   I will search for color classes usage in `config-plus` and see if they need alignment.
    *   However, if `config-plus` uses standard shadcn utility classes (like `bg-primary`, `text-primary-foreground`), changing the variables in `app.css` should propagate the theme globally.
    *   I will verify if there are any hardcoded colors.

## 4. Execution
-   Start with `app.css`.
-   Verify `tailwind.config.ts`.
-   Grep for hardcoded colors in `src/routes`.

