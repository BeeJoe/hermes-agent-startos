#!/usr/bin/env python3
"""Search the Start9 documentation knowledge bundle (offline, no network).

The bundle is a JSON document published by support-server containing the full
text of StartOS/StartTunnel doc pages, package overviews, and known issues.
This script mirrors start-bot's lookup_docs access over that same artifact.

Usage:
  docs-search.py index                 # list doc indexes + packages
  docs-search.py page "<title|id>"     # full page / package overview text
  docs-search.py search "<query>"      # full-text search
  docs-search.py issues [<packageId>]  # active known issues
"""
import json
import os
import re
import sys

# Live (refreshed) copy on the data volume; fall back to the image baseline.
CANDIDATES = [
    os.environ.get("HERMES_BUNDLE_PATH", ""),
    "/opt/data/.startos/knowledge/bundle.json",
    "/opt/startos/knowledge/bundle.json",
]


def load_bundle():
    for path in CANDIDATES:
        if path and os.path.isfile(path):
            with open(path, encoding="utf-8") as f:
                return json.load(f)
    sys.exit("No knowledge bundle found.")


def normalize(key: str) -> str:
    return (
        key.lower().strip().removesuffix(".html").replace("-", " ").rstrip("/")
    )


def build_page_map(bundle: dict) -> dict:
    pages = bundle.get("pages", {}) or {}
    out = {}
    for book in ("startOs", "startTunnel"):
        for key, content in (pages.get(book) or {}).items():
            out[normalize(key)] = content
    for pkg_key, sub in (pages.get("upstream") or {}).items():
        for slug, content in (sub or {}).items():
            out[normalize(f"{pkg_key}/{slug}")] = content
    for pkg_id, pkg in (bundle.get("packages") or {}).items():
        parts = []
        if pkg.get("descriptionLong"):
            parts.append(pkg["descriptionLong"])
        if pkg.get("readme"):
            parts.append("## README\n\n" + pkg["readme"])
        if pkg.get("upstreamIndex"):
            parts.append("## Upstream Docs\n\n" + pkg["upstreamIndex"])
        if parts:
            content = "\n\n".join(parts)
            out[normalize(pkg_id)] = content
            if pkg.get("title"):
                out[normalize(pkg["title"])] = content
    return out


def cmd_index(bundle: dict):
    for name, idx in (bundle.get("indexes") or {}).items():
        print(f"# index: {name}\n{idx}\n")
    pkgs = bundle.get("packages") or {}
    if pkgs:
        print("# packages")
        for pkg_id, pkg in pkgs.items():
            print(f"- {pkg_id}: {pkg.get('descriptionShort', '')}")


def cmd_page(bundle: dict, query: str):
    page_map = build_page_map(bundle)
    hit = page_map.get(normalize(query))
    if hit:
        print(hit)
    else:
        sys.exit(f'Page "{query}" not found. Run `index` for available titles.')


def cmd_search(bundle: dict, query: str):
    q = query.lower()
    page_map = build_page_map(bundle)
    found = False
    for key, content in page_map.items():
        if q in key or q in content.lower():
            snippet = content.strip().replace("\n", " ")[:300]
            print(f"## {key}\n{snippet}\n")
            found = True
    for issue in bundle.get("knownIssues") or []:
        blob = (issue.get("title", "") + " " + issue.get("content", "")).lower()
        if q in blob:
            print(f"## known issue: {issue.get('title')}\n{issue.get('content')}\n")
            found = True
    if not found:
        print(f'No matches for "{query}".')


def cmd_issues(bundle: dict, package_id: str = ""):
    issues = bundle.get("knownIssues") or []
    for issue in issues:
        applies = issue.get("applies_to") or []
        if package_id and applies and package_id not in applies:
            continue
        print(
            f"[{issue.get('severity', 'info')}] {issue.get('title')}\n"
            f"{issue.get('content')}\n"
        )


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cmd = sys.argv[1]
    bundle = load_bundle()
    arg = sys.argv[2] if len(sys.argv) > 2 else ""
    if cmd == "index":
        cmd_index(bundle)
    elif cmd == "page":
        cmd_page(bundle, arg)
    elif cmd == "search":
        cmd_search(bundle, arg)
    elif cmd == "issues":
        cmd_issues(bundle, arg)
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
