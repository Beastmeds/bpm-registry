import fetch from 'node-fetch';
import chalk from 'chalk';

// GitHub Pages hosted registry
const REGISTRY_URL = 'https://beastmeds.github.io/bpm-registry';

export async function fetchRegistry() {
  const res = await fetch(`${REGISTRY_URL}/registry.json`);
  if (!res.ok) throw new Error(`Registry nicht erreichbar: ${res.status}`);
  return res.json();
}

export async function fetchPackage(name) {
  const registry = await fetchRegistry();
  const pkg = registry.packages[name];
  if (!pkg) throw new Error(`Package "${chalk.yellow(name)}" nicht gefunden`);
  return pkg;
}

export async function fetchPackageVersion(name, version) {
  const pkg = await fetchPackage(name);
  const v = version || pkg.latest;
  const vData = pkg.versions[v];
  if (!vData) throw new Error(`Version ${v} von "${name}" nicht gefunden`);
  return { ...vData, version: v, name };
}

export async function downloadPackage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download fehlgeschlagen: ${res.status}`);
  return res.text();
}

export { REGISTRY_URL };
