<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## M1 architecture
- Keep the existing TanStack Start file-based routing and root providers; public shell components receive repository-resolved data so infrastructure is preserved.
- Use framework-independent M1 contracts and a synchronous local mock repository behind one interface; presentation never imports fixtures so future adapters can replace the source.
- Keep unimplemented menu destinations explicitly unavailable without links; only reference existing routes or homepage section anchors to avoid dead navigation and premature modules.
- Use existing Radix dialog primitives for modal navigation so focus trapping, Escape and focus restoration are maintained by the accessibility library.
