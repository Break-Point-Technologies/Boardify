import sys
import socket

TLD_PRICING = {
    "com": 12,
    "net": 15,
    "org": 15,
    "io": 40,
    "ai": 70,
    "co": 25,
    "app": 20,
    "dev": 15,
    "xyz": 2,
    "info": 3,
}

def is_domain_available(domain):
    try:
        socket.gethostbyname(domain)
        return False
    except socket.gaierror:
        return True

def get_estimated_price(domain):
    tld = domain.split(".")[-1].lower()
    return TLD_PRICING.get(tld, 50)

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 main.py example.com")
        return

    domain = sys.argv[1].strip().lower()

    available = is_domain_available(domain)
    price = get_estimated_price(domain)

    if not available:
        print(f"{domain} is NOT available.")
        return

    if price < 50:
        print(f"{domain} is LIKELY available for ~${price} ✅")
    else:
        print(f"{domain} is available but likely costs ~${price} ❌")


if __name__ == "__main__":
    main()