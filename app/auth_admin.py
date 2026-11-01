#!/usr/bin/env python3
"""NTU-LUNGTA account administration from the server shell (R12).

  python3 auth_admin.py list
  python3 auth_admin.py approve EMAIL student|teacher
  python3 auth_admin.py reject EMAIL
  python3 auth_admin.py disable EMAIL
  python3 auth_admin.py reset-password EMAIL      (prints a temporary password)
  python3 auth_admin.py courses                   (course owners and course codes)
  python3 auth_admin.py test-email                (sends a test message to the administrator)
"""
import secrets, sys, time
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lungta_auth as A


def _user(email):
    row = A.user_by_email(email)
    if not row:
        sys.exit('No account for %s' % email)
    return row


def main(argv):
    A.init()
    if len(argv) < 2 or argv[1] in ('-h', '--help', 'help'):
        print(__doc__)
        return 0
    cmd = argv[1]
    if cmd == 'list':
        print('Administrator: %s' % A.admin_email())
        for r in A._all('SELECT * FROM users ORDER BY created_at'):
            print('%-4s %-34s %-18s requested=%-8s status=%-9s role=%-8s %s' % (
                r['id'], r['email'], r['name'][:18], r['requested_role'], r['status'], r['role'] or '-',
                time.strftime('%Y-%m-%d %H:%M', time.localtime(r['created_at'] or 0))))
        return 0
    if cmd == 'approve' and len(argv) == 4 and argv[3] in ('student', 'teacher'):
        row = A._decide(_user(argv[2])['id'], argv[3])
        print('[OK] %s approved as %s' % (row['email'], row['role']))
        return 0
    if cmd in ('reject', 'disable') and len(argv) == 3:
        row = A._decide(_user(argv[2])['id'], cmd)
        print('[OK] %s is now %s' % (row['email'], row['status']))
        return 0
    if cmd == 'reset-password' and len(argv) == 3:
        row = _user(argv[2])
        temp = ''.join(secrets.choice('abcdefghjkmnpqrstuvwxyz23456789') for _ in range(10))
        A._run(lambda c: (c.execute('UPDATE users SET pw=? WHERE id=?', (A.hash_password(temp), row['id'])),
                          c.execute('DELETE FROM sessions WHERE user_id=?', (row['id'],))))
        print('[OK] Temporary password for %s: %s' % (row['email'], temp))
        return 0
    if cmd == 'courses':
        for r in A._all('SELECT c.course_id, c.code, u.email FROM courses c LEFT JOIN users u ON u.id=c.owner_id ORDER BY c.created_at'):
            print('%-8s %-40s %s' % (r['code'], r['course_id'], r['email']))
        return 0
    if cmd == 'test-email':
        A.send_email(A.admin_email(), '[NTU-LUNGTA] 帳號審核功能已啟用',
                     '帳號審核功能已啟用。之後新的帳號申請（學生或老師）都會寄到這個信箱，點信中的「審核頁面」即可核准。\n'
                     '網站：%s/login/\n\n第一次使用：請先在網站「申請帳號」，用這個 Email 申請「老師」，再到這個信箱核准自己。\n' % A.PUBLIC_URL)
        print('[OK] Test e-mail sent to %s' % A.admin_email())
        return 0
    print(__doc__)
    return 2


if __name__ == '__main__':
    sys.exit(main(sys.argv))
