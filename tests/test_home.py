from playwright.sync_api import Page, expect


def test_homepage_loads_and_shows_seed_post(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    expect(page).to_have_title("The Thoughtful Mind")
    expect(page.get_by_role("heading", name="The Thoughtful Mind", exact=True)).to_be_visible()
    expect(page.get_by_role("link", name="Bem-vindo ao The Thoughtful Mind")).to_be_visible()


def test_homepage_nav_links_present(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    nav = page.get_by_role("navigation", name="Primary")
    expect(nav.get_by_role("link", name="Início")).to_be_visible()
    expect(nav.get_by_role("link", name="Etiquetas")).to_be_visible()
    expect(nav.get_by_role("link", name="Sobre")).to_be_visible()
