from playwright.sync_api import Page, expect

POST_PATH = "/posts/2026-01-01-welcome/"


def test_post_renders_title_and_body(page: Page, base_url: str):
    page.goto(f"{base_url}{POST_PATH}")

    expect(page.get_by_role("heading", name="Welcome to The Thoughtful Mind", level=1)).to_be_visible()
    expect(page.get_by_text("Thanks for reading.")).to_be_visible()


def test_post_has_reading_time_and_date(page: Page, base_url: str):
    page.goto(f"{base_url}{POST_PATH}")

    expect(page.locator(".meta")).to_contain_text("min read")
    expect(page.locator("time")).to_have_attribute("datetime", "2026-01-01T00:00:00.000Z")


def test_post_has_hreflang_alternate_links(page: Page, base_url: str):
    page.goto(f"{base_url}{POST_PATH}")

    en_alternate = page.locator('link[rel="alternate"][hreflang="en"]')
    expect(en_alternate).to_have_count(1)

    default_alternate = page.locator('link[rel="alternate"][hreflang="x-default"]')
    expect(default_alternate).to_have_count(1)
