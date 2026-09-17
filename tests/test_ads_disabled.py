from playwright.sync_api import Page, expect


def test_no_ad_markup_when_adsense_disabled(page: Page, base_url: str):
    page.goto(f"{base_url}/posts/2026-01-01-bem-vindo/")

    expect(page.locator(".ad-slot")).to_have_count(0)
    expect(page.locator("ins.adsbygoogle")).to_have_count(0)
