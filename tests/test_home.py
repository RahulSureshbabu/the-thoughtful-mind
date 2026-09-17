from playwright.sync_api import Page, expect


def test_homepage_loads_and_shows_seed_post(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    expect(page).to_have_title("The Thoughtful Mind")
    expect(page.get_by_role("heading", name="The Thoughtful Mind", exact=True)).to_be_visible()
    expect(page.get_by_role("link", name="Welcome to The Thoughtful Mind")).to_be_visible()


def test_homepage_nav_links_present(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    nav = page.get_by_role("navigation", name="Primary")
    expect(nav.get_by_role("link", name="Home")).to_be_visible()
    expect(nav.get_by_role("link", name="Tags")).to_be_visible()
    expect(nav.get_by_role("link", name="About")).to_be_visible()
