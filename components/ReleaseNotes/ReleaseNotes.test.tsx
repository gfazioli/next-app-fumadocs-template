import { SWRConfig } from 'swr';
import { render, screen } from '@/test-utils';
import { ReleaseNotes } from './ReleaseNotes';

// marked ships only ESM, which Jest's CommonJS runtime cannot load; how a body renders is not
// what these tests are about.
jest.mock('marked', () => ({ marked: { parse: (body: string) => `<p>${body}</p>` } }));

const release = {
  id: 1,
  name: 'v1.0.26',
  tag_name: 'v1.0.26',
  html_url: 'https://github.com/gfazioli/next-app-fumadocs-template/releases/tag/v1.0.26',
  published_at: '2026-11-20T10:22:23Z',
  prerelease: false,
  body: '- name / as the home page canonical',
};

function respond(body: unknown) {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => body });
}

function renderNotes() {
  // A fresh SWR cache for each test: they all ask for the same key.
  return render(
    <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>
      <ReleaseNotes />
    </SWRConfig>
  );
}

describe('ReleaseNotes', () => {
  it('lists the releases the /api/github-releases proxy wraps in { releases, status }', async () => {
    respond({ releases: [release], status: 'ok' });
    renderNotes();
    expect(await screen.findByRole('link', { name: 'v1.0.26' })).toHaveAttribute(
      'href',
      release.html_url
    );
    expect(global.fetch).toHaveBeenCalledWith('/api/github-releases', undefined);
  });

  it('lists the releases of a bare array, the shape the GitHub API itself answers', async () => {
    respond([release]);
    renderNotes();
    expect(await screen.findByRole('link', { name: 'v1.0.26' })).toBeInTheDocument();
  });

  it('shows the warning instead of crashing when the response holds no release list', async () => {
    respond({ error: 'Not available in static export' });
    renderNotes();
    expect(await screen.findByText('Could not load the releases')).toBeInTheDocument();
  });
});
